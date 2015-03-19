using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using System.Data.Linq;
using System.Data.Linq.Mapping;

namespace weather.Models
{
    //UUDD 151700Z 01004MPS CAVOK 03/M08 Q1044 32010095 82010095 NOSIG
    [DataContract]
    [Table(Name = "IntarnationalForecast")]
    public class METARabroad
    {
        [DataMember]
        [Column(IsPrimaryKey = true)]
        public int Id { get; set; }
        [DataMember]
        [Column]
        public string ICAOcode { get; set; }
        [DataMember]
        [Column]
        public DateTime DateAndTime { get; set; }
        [DataMember]
        [Column]
        public int WindDirection { get; set; }  //Направление ветра
        [DataMember]
        [Column]
        public int WindSpeed { get; set; }
        [DataMember]
        [Column]
        public string Visibility { get; set; }
        [DataMember]
        [Column]
        public string Weather { get; set; } //явления погоды
        [DataMember]
        [Column]
        public string Clouds { get; set; }
        [DataMember]
        [Column]
        public int Temperature { get; set; }
        [DataMember]
        [Column]
        public int Dewpoint { get; set; } //точка росы
        [DataMember]
        [Column]
        public int QNH { get; set; } //давление на уровне моря
        [DataMember]
        [Column]
        public string Forecast { get; set; } //прогноз на посадку


    }
}