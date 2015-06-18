using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TimeTableFront.Models
{
    public class FlightModel
    {
        public List<FlightInfo> GetArrival()
        {
            //прибытие
            return new List<FlightInfo>(){
                new FlightInfo(){
                    AirCompany = "LUFTHANZA", Aircraft = "Airbus A320",
                    DepartureCity = "Мюнхен", 
                    ArrivalCity = "Москва", Time = DateTime.Parse("17:56"),
                    FlightNumber = "LH 2530", Status = FlightStatus.Прибыл
                },                
                new FlightInfo(){
                    AirCompany = "URAL AIRLINES", Aircraft = "Airbus A321",
                    DepartureCity = "Барселона",                 
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:00"),
                    FlightNumber = "U 63546", Status = FlightStatus.Задержан
                },
                new FlightInfo(){
                    AirCompany = "METROJET", Aircraft = "Airbus A321",
                    DepartureCity = "Хургада",
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:05"),
                    FlightNumber = "7K 9520", Status = FlightStatus.Прибывает
                },
                new FlightInfo(){
                    AirCompany = "АЭРОФЛОТ", Aircraft = "Boeing 777-300ER",
                    DepartureCity = "Пекин", 
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:10"),
                    FlightNumber = "SU 204", Status = FlightStatus.Ожидается
                },
                new FlightInfo(){
                    AirCompany = "AIRFRANCE", Aircraft = "Airbus A330-200",
                    DepartureCity = "Париж", 
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:15"),
                    FlightNumber = "AF 4909", Status = FlightStatus.Ожидается
                },
                new FlightInfo(){
                    AirCompany = "АЭРОФЛОТ", Aircraft = "Airbus A330-200",
                    DepartureCity = "Франкфурт-На-Майне", 
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:20"),
                    FlightNumber = "SU 2303", Status = FlightStatus.Отменен
                },
                new FlightInfo(){
                    AirCompany = "ТРАНСАЭРО", Aircraft = "Boeing 767-300",
                    DepartureCity = "Пальма де Майорка", 
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:22"),
                    FlightNumber = "UN 9106", Status = FlightStatus.Ожидается
                },
            };
        }
        public List<FlightInfo> GetDeparture()
        {
            //отправление
            return new List<FlightInfo>(){
                new FlightInfo(){
                    AirCompany = "S7 AIRLINES", Aircraft = "Boeing 737H",
                    DepartureCity = "Москва", Time = DateTime.Parse("18:00"),
                    ArrivalCity = "Ларнака", 
                    FlightNumber = "SU 204", Status = FlightStatus.Отправлен
                },
                new FlightInfo(){
                    AirCompany = "S7 AIRLINES", Aircraft = "Airbus A320",
                    DepartureCity = "Москва", Time = DateTime.Parse("18:17"),
                    ArrivalCity = "Ереван", 
                    FlightNumber = "SU 204", Status = FlightStatus.РегистрацияЗавершена
                },
                new FlightInfo(){
                    AirCompany = "LUFTHANZA", Aircraft = "Airbus A320",
                    DepartureCity = "Москва", Time = DateTime.Parse("18:27"),
                    ArrivalCity = "Франкфурт-На-Майне", 
                    FlightNumber = "SU 204", Status = FlightStatus.Регистрация
                },
                new FlightInfo(){
                    AirCompany = "EMIRATES", Aircraft = "Boeing 777-300ER",
                    DepartureCity = "Москва", Time = DateTime.Parse("18:30"),
                    ArrivalCity = "Дубай",
                    FlightNumber = "SU 204", Status = FlightStatus.Ожидается
                },
            };
        }

    }
}