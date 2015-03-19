using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.Linq;
using System.Data.Linq.Mapping;
using weather.Models;


namespace weather.Controllers
{
    public class DatabaseConnector
    {
        DataContext db;
        private void Connect()
        {
            ConnectionStringSettings settings = ConfigurationManager.ConnectionStrings["Weatherdb"];
            if (db == null)
            {
                db = new DataContext(settings.ConnectionString);
            }
        }
        public METARcurrent CurrentWeather(DateTime date)
        {
            Connect();
            Table<METARcurrent> WeatherData = db.GetTable<METARcurrent>();

            IQueryable<METARcurrent> Query =
            from Wthr in WeatherData
            where (Wthr.DateAndTime >= date.AddHours(-1)) && (Wthr.DateAndTime >= date.AddHours(1))
            select Wthr;

            var ResWeather = Query.First();
            return ResWeather;
        }
        public METARabroad AbroadWeather(string ICAOcode)
        {
            Connect();
            Table<METARabroad> WeatherData = db.GetTable<METARabroad>();

            IQueryable<METARabroad> Query =
            from Wthr in WeatherData
            where (Wthr.ICAOcode == ICAOcode)
            select Wthr;
            var ResWeather = Query.First();
            return ResWeather;
        }
        public void Decode(METARcurrent info, string lang)
        {
            info.Clouds = GetValue(info.Clouds, lang);
            info.Forecast = GetValue(info.Forecast, lang);
            info.Visibility = GetValue(info.Visibility, lang);
            info.Weather = GetValue(info.Weather, lang);
        }
        public void Decode(METARabroad info, string lang)
        {
            info.Clouds = GetValue(info.Clouds, lang);
            info.Forecast = GetValue(info.Forecast, lang);
            //info.Visibility = GetValue(info.Visibility, lang);
            info.Weather = GetValue(info.Weather, lang);
        }
        public string METARtostring(METARcurrent item)
        {
            string temp_res = "UUEE " + item.DateAndTime.Day + item.DateAndTime.Hour + item.DateAndTime.Minute + "Z ";
            temp_res += item.WindDirection.ToString("D3") + item.WindSpeed.ToString("D2") + "MPS " +
                item.Visibility + " " + item.Weather + " " + item.Clouds + " ";
            if (item.Temperature < 0)
            {
                temp_res += "M" + Math.Abs(item.Temperature) + "/";
            }
            else
            {
                temp_res += Math.Abs(item.Temperature) + "/";
            }
            if (item.Dewpoint < 0)
            {
                temp_res += "M" + Math.Abs(item.Dewpoint) + " ";
            }
            else
            {
                temp_res += Math.Abs(item.Dewpoint) + " ";
            }
            temp_res += "Q" + item.QNH + " " + item.Forecast;

            return temp_res;
        }

        public string METARtostring(METARabroad item)
        {
            string temp_res = item.ICAOcode + " " + item.DateAndTime.Day + item.DateAndTime.Hour + item.DateAndTime.Minute + "Z ";
            temp_res += item.WindDirection.ToString("D3") + item.WindSpeed.ToString("D2") + "MPS " +
                item.Visibility + " " + item.Weather + " " + item.Clouds + " ";
            if (item.Temperature < 0)
            {
                temp_res += "M" + Math.Abs(item.Temperature) + "/";
            }
            else
            {
                temp_res += Math.Abs(item.Temperature) + "/";
            }
            if (item.Dewpoint < 0)
            {
                temp_res += "M" + Math.Abs(item.Dewpoint) + " ";
            }
            else
            {
                temp_res += Math.Abs(item.Dewpoint) + " ";
            }
            temp_res += "Q" + item.QNH + " " + item.Forecast;

            return temp_res;
        }

        private string GetValue(string item, string lang)
        {
            Connect();
            Table<Parameter> WeatherData = db.GetTable<Parameter>();
            IQueryable<Parameter> Query =
            from Wthr in WeatherData
            where (Wthr.Item == item)
            select Wthr;

            var ResWeather = Query.First();
            if (lang == "rus")
            {
                return ResWeather.Russian;
            }
            else
            {
                return ResWeather.English;
            }

        }

    }
}