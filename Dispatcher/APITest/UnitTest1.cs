using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Net;


namespace APITest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void GetWeatherTest()
        {
            WebRequest request = WebRequest.Create(@"http://localhost:55975/api/files");
            request.Credentials = CredentialCache.DefaultCredentials;
            /*request.Headers.Add("UserId", deserializedResult["UserId"]);
            WebResponse response = request.GetResponse();
            Stream dataStream = response.GetResponseStream();
            StreamReader reader = new StreamReader(dataStream);
            string responseFromServer = reader.ReadToEnd();

            var serializer = new JavaScriptSerializer();
            var Result = serializer.Deserialize<List<Models.File>>(responseFromServer);
            Log(responseFromServer, logtype.Debug);
            //Запрос у бекенда данных
            return View("AllFiles", Result);*/
        }
    }
}
