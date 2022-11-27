package main
import (
    "net/http"
    "github.com/gin-gonic/gin"
)
type user struct {
    ID     string  `json:"id"`
    Username  string  `json:"username"`
    Password string  `json:"password"`
    Email  string `json:"email"`
}
func postUsers(c *gin.Context) {
    var newUser user
    if err := c.BindJSON(&newUser); err != nil {
        return
    }

    users = append(users, newUser)
    c.IndentedJSON(http.StatusCreated, newUser)
}
var users = []user{//sample data
    {ID: "1", Username: "ram", Password: "hehe", Email: "user@gmail.com"},
	{ID: "2", Username: "pepega", Password: "hoho", Email: "user@gmail.com"},
	{ID: "3", Username: "sergey", Password: "Jhihi", Email: "user@gmail.com"},
}
func getUsers(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, users)
}
func main() {
    router := gin.Default()
    router.GET("/user", getUsers)
	router.POST("/user", postUsers)
	//router.POST("/register", controllers.Register)
    router.Run("localhost:8080")
    
}