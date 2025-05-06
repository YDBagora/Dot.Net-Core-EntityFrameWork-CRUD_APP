using System.Text.Json.Serialization;

namespace ResturantApp.Module.Entitys
{
    public class OrderItem : BaseEntity
    {
        public int Quantity { get; set; }
            
        public Guid OrderID { get; set; }

        [JsonIgnore]
        public Order? Order { get; set; }

        public Guid ItemID { get; set; }

        [JsonIgnore]
        public Item? Item { get; set; }
    }
}
