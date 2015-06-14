using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TimeTable.Models
{
    public class FlightModel
    {
        public List<Flight> GetArrival()
        {
            //прибытие
            return new List<Flight>(){
                new Flight(){
                    AirCompany = "LUFTHANZA", Aircraft = "Airbus A320",
                    DepartureCity = "Мюнхен", 
                    ArrivalCity = "Москва", Time = DateTime.Parse("17:56"),
                    FlightNumber = "LH 2530", Status = FlightStatus.Прибыл
                },                
                new Flight(){
                    AirCompany = "URAL AIRLINES", Aircraft = "Airbus A321",
                    DepartureCity = "Барселона",                 
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:00"),
                    FlightNumber = "U 63546", Status = FlightStatus.Задержан
                },
                new Flight(){
                    AirCompany = "METROJET", Aircraft = "Airbus A321",
                    DepartureCity = "Хургада",
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:05"),
                    FlightNumber = "7K 9520", Status = FlightStatus.Прибывает
                },
                new Flight(){
                    AirCompany = "АЭРОФЛОТ", Aircraft = "Boeing 777-300ER",
                    DepartureCity = "Пекин", 
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:10"),
                    FlightNumber = "SU 204", Status = FlightStatus.Ожидается
                },
                new Flight(){
                    AirCompany = "AIRFRANCE", Aircraft = "Airbus A330-200",
                    DepartureCity = "Париж", 
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:15"),
                    FlightNumber = "AF 4909", Status = FlightStatus.Ожидается
                },
                new Flight(){
                    AirCompany = "АЭРОФЛОТ", Aircraft = "Airbus A330-200",
                    DepartureCity = "Франкфурт-На-Майне", 
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:20"),
                    FlightNumber = "SU 2303", Status = FlightStatus.Отменен
                },
                new Flight(){
                    AirCompany = "ТРАНСАЭРО", Aircraft = "Boeing 767-300",
                    DepartureCity = "Пальма де Майорка", 
                    ArrivalCity = "Москва", Time = DateTime.Parse("18:22"),
                    FlightNumber = "UN 9106", Status = FlightStatus.Ожидается
                },
            };
        }
        public List<Flight> GetDeparture()
        {
            //отправление
            return new List<Flight>(){
                new Flight(){
                    AirCompany = "S7 AIRLINES", Aircraft = "Boeing 737H",
                    DepartureCity = "Москва", Time = DateTime.Parse("18:00"),
                    ArrivalCity = "Ларнака", 
                    FlightNumber = "SU 204", Status = FlightStatus.Отправлен
                },
                new Flight(){
                    AirCompany = "S7 AIRLINES", Aircraft = "Airbus A320",
                    DepartureCity = "Москва", Time = DateTime.Parse("18:17"),
                    ArrivalCity = "Ереван", 
                    FlightNumber = "SU 204", Status = FlightStatus.РегистрацияЗавершена
                },
                new Flight(){
                    AirCompany = "LUFTHANZA", Aircraft = "Airbus A320",
                    DepartureCity = "Москва", Time = DateTime.Parse("18:27"),
                    ArrivalCity = "Франкфурт-На-Майне", 
                    FlightNumber = "SU 204", Status = FlightStatus.Регистрация
                },
                new Flight(){
                    AirCompany = "EMIRATES", Aircraft = "Boeing 777-300ER",
                    DepartureCity = "Москва", Time = DateTime.Parse("18:30"),
                    ArrivalCity = "Дубай",
                    FlightNumber = "SU 204", Status = FlightStatus.Ожидается
                },
            };
        }

    }
}