//------------------------------------------------------------------------------
// <auto-generated>
//    Этот код был создан из шаблона.
//
//    Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//    Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace timetable.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Airports
    {
        public Airports()
        {
            this.Flights = new HashSet<Flights>();
            this.Flights1 = new HashSet<Flights>();
        }
    
        public int AirportID { get; set; }
        public string City { get; set; }
        public string Title { get; set; }
        public string ABB { get; set; }
    
        public virtual ICollection<Flights> Flights { get; set; }
        public virtual ICollection<Flights> Flights1 { get; set; }
    }
}
