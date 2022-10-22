using Microsoft.EntityFrameworkCore;
using WeRecWebApp.Models;

namespace WeRecWebApp.Repository
{
    public class FeedDbContext : DbContext
    {
        public DbSet<Feed> Feeds { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<FeedConfiguration> Configurations { get; set; }
        public FeedDbContext (DbContextOptions<FeedDbContext> options) : base(options) { }
    }
}