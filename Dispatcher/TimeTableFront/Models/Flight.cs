using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TimeTableFront.Models
{
    public enum FlightStatus
    {
        Прибыл,
        Прибывает,
        Ожидается,
        Отправлен,
        РегистрацияЗавершена,
        Регистрация,
        Задержан,
        Отменен
    }
    public enum FlightType
    {
        Arrival,
        Departure
    }
    public class FlightInfo
    {
        public string FlightNumber { get; set; }
        public string AirCompany { get; set; }
        public string ArrivalCity { get; set; }
        public string DepartureCity { get; set; }
        public DateTime Time { get; set; }
        public string Aircraft { get; set; }
        public FlightStatus Status { get; set; }
        public FlightType Type { get; set; }
    }
}