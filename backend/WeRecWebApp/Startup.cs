using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using WeRecWebApp.Models;
using WeRecWebApp.Repository;
using WeRecWebApp.Services;

namespace WeRecWebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //Add PostgreSQL support
            services.AddEntityFrameworkNpgsql()
                .AddDbContext<FeedDbContext>(options =>
                    options.UseNpgsql(Configuration["Data:DbContext:ConnectionString"]));
            
            services.Configure<YouTubeSettings>(Configuration.GetSection(nameof(YouTubeSettings)));

            services.AddControllers();

            // Add our PostgreSQL Repositories (scoped to each request)
            services.AddScoped<IFeedRepository, FeedRepository>();

            //Transient: Created each time they're needed
            services.AddTransient<FeedDbSeeder>();
            services.AddTransient<YTVideoService>();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("1.0.3", new OpenApiInfo
                {
                    Version = "1.1.0",
                    Title = "Swagger WeRec - OpenAPI 3.0",
                    Description = "Swagger WeRec - OpenAPI 3.0 (ASP.NET Core 3.1)",
                    Contact = new OpenApiContact()
                    {
                        Name = "Swagger Codegen Contributors",
                        Url = new Uri("https://github.com/swagger-api/swagger-codegen"),
                        Email = ""
                    },
                    TermsOfService = new Uri("http://swagger.io/terms/")
                });
                options.CustomSchemaIds(type => type.FullName);
            });

            services.AddCors(o => o.AddPolicy("AllowAllPolicy", options =>
            {
                options.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "dist";
            });

            // services.AddRouting(options => options.LowercaseUrls = true);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, FeedDbSeeder feedDbSeeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseCors("AllowAllPolicy");

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();

            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            // Visit http://localhost:5000/swagger
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/1.0.3/swagger.json", "Swagger WeRec - OpenAPI 3.0");
            });

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action}/{id?}");
            });

            feedDbSeeder.SeedAsync(app.ApplicationServices).Wait();
        }
    }
}
