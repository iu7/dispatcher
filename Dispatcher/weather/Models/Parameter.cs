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
    [DataContract]
    [Table(Name = "Parameters")]
    public class Parameter
    {
        [DataMember]
        [Column(IsPrimaryKey = true)]
        public string Item { get; set; }
        [DataMember]
        [Column]
        public string English { get; set; }
        [DataMember]
        [Column]
        public string Russian { get; set; }
    }
}