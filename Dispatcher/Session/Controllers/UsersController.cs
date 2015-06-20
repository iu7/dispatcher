using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Session.Models;

namespace Session.Controllers
{
    public class UsersController : ApiController
    {
        int ExpiredDays = 3;
        // GET api/users
        public Dictionary<string, string> Get()
        {
            try
            {
                //Пользователь по сессии
                var arr1 = Request.Headers.First(p => p.Key == "sessionid").Value.ToList<string>();
                string session_id = Convert.ToString(arr1[0]);

                var db = new Models.SessionDBEntities();
                var CurrentUser = db.Users.FirstOrDefault(p => p.Token == session_id);

                if (CurrentUser == null)
                {
                    //Log("Не найдена сессия", logtype.Warning);
                    throw (new Exception("Не найдена сессия " + session_id));
                }
                else if (Convert.ToDateTime(CurrentUser.DateTo) < DateTime.Now)
                {
                    //Log("Session expired", logtype.Info);
                    throw (new Exception("Session expired"));
                }
                else
                {
                    return CurrentUser.ToDictionary();
                }
            }
            catch(Exception ex)
            {
                return new Dictionary<string,string>() { { "Error" , ex.Message } };
            }
        }

        // POST api/users
        public Dictionary<string, string> Post([FromBody]string value)
        {
            try
            {
                var arr1 = Request.Headers.First(p => p.Key == "Login").Value.ToList<string>();
                string login = Convert.ToString(arr1[0]);
                arr1 = Request.Headers.First(p => p.Key == "Password").Value.ToList<string>();
                string password = Convert.ToString(arr1[0]);

                var db = new Models.SessionDBEntities();

                var current_user = db.Users.FirstOrDefault(p => p.Password == password && p.Login == login);
                if (current_user == null)
                {
                    throw (new Exception("Не найден login " + login));
                }
                else if (current_user.Password != password)
                {
                    throw (new Exception("Неверный пароль"));
                }
                else
                {
                    current_user.DateFrom = DateTime.Now;
                    current_user.DateTo = DateTime.Now.AddDays(ExpiredDays);
                    current_user.Token = Users.GenerateRandomString(20);
                    db.SaveChanges();
                    return current_user.ToDictionary();
                }
            }
            catch (Exception ex)
            {
                return new Dictionary<string, string>() { { "Error", ex.Message } };
            }
        }

        // DELETE api/users
        public void Delete()
        {
            var arr1 = Request.Headers.First(p => p.Key == "UserId").Value.ToList<string>();
            int user_id = Convert.ToInt32(arr1[0]);

            var db = new Models.SessionDBEntities();
            var deleteduser = db.Users.FirstOrDefault(p => p.UserId == user_id);
            db.Users.Remove(deleteduser);
            db.SaveChanges();
        }
    }
}