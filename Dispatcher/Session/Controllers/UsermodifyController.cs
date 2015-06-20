using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Session.Models;

namespace Session.Controllers
{
    public class UsermodifyController : ApiController
    {
        // GET api/usermodify
        public IEnumerable<Users> Get()
        {
             var db = new Models.SessionDBEntities();
             return db.Users.ToList();
        }

        // POST api/usermodify
        public Dictionary<string, string> Post([FromBody]string value)
        {
            //Create
            try
            {
                var arr1 = Request.Headers.First(p => p.Key == "Login").Value.ToList<string>();
                string login = Convert.ToString(arr1[0]);
                arr1 = Request.Headers.First(p => p.Key == "Password").Value.ToList<string>();
                string password = Convert.ToString(arr1[0]);

                arr1 = Request.Headers.First(p => p.Key == "FirstName").Value.ToList<string>();
                string first_name = Convert.ToString(arr1[0]);
                arr1 = Request.Headers.First(p => p.Key == "SecondName").Value.ToList<string>();
                string second_name = Convert.ToString(arr1[0]);
                arr1 = Request.Headers.First(p => p.Key == "MiddleName").Value.ToList<string>();
                string middle_name = Convert.ToString(arr1[0]);

                arr1 = Request.Headers.First(p => p.Key == "PostName").Value.ToList<string>();
                string post_name = Convert.ToString(arr1[0]);
                arr1 = Request.Headers.First(p => p.Key == "RoleId").Value.ToList<string>();
                int role_id = Convert.ToInt32(arr1[0]);


                var NewUser = new Users()
                {
                    Login = login,
                    Password = password,
                    FirstName = first_name,
                    SecondName = second_name,
                    MiddleName = middle_name,
                    PostName = post_name,
                    RoleId = role_id
                };
                var db = new Models.SessionDBEntities();
                NewUser = db.Users.Add(NewUser);
                db.SaveChanges();
                return new Dictionary<string, string>() { { "UserId", NewUser.UserId.ToString() } }; 
            }
            catch (Exception ex)
            {
                return new Dictionary<string, string>() { { "Error", ex.Message } };
            }
        }

        // PUT api/usermodify/5
        public Dictionary<string, string> Put(int id, [FromBody]string value)
        {
            //Modify
            try
            {
                var arr1 = Request.Headers.First(p => p.Key == "Login").Value.ToList<string>();
                string login = Convert.ToString(arr1[0]);
                arr1 = Request.Headers.First(p => p.Key == "Password").Value.ToList<string>();
                string password = Convert.ToString(arr1[0]);

                arr1 = Request.Headers.First(p => p.Key == "FirstName").Value.ToList<string>();
                string first_name = Convert.ToString(arr1[0]);
                arr1 = Request.Headers.First(p => p.Key == "SecondName").Value.ToList<string>();
                string second_name = Convert.ToString(arr1[0]);
                arr1 = Request.Headers.First(p => p.Key == "MiddleName").Value.ToList<string>();
                string middle_name = Convert.ToString(arr1[0]);

                arr1 = Request.Headers.First(p => p.Key == "PostName").Value.ToList<string>();
                string post_name = Convert.ToString(arr1[0]);
                arr1 = Request.Headers.First(p => p.Key == "RoleId").Value.ToList<string>();
                int role_id = Convert.ToInt32(arr1[0]);

                var db = new Models.SessionDBEntities();
                var CurrentUser = db.Users.FirstOrDefault(p => p.Login == login && p.Password == password);

                CurrentUser.FirstName = first_name;
                CurrentUser.SecondName = second_name;
                CurrentUser.MiddleName = middle_name;
                CurrentUser.PostName = post_name;
                CurrentUser.RoleId = role_id;

                db.SaveChanges();
                return new Dictionary<string, string>() { { "UserId", CurrentUser.UserId.ToString() } };
            }
            catch (Exception ex)
            {
                return new Dictionary<string, string>() { { "Error", ex.Message } };
            }
        }

    }
}
