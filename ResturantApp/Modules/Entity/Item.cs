using System.ComponentModel.DataAnnotations.Schema;

namespace ResturantApp.Module.Entitys
{
    public class Item : BaseEntity
    {
        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; } = string.Empty;


        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
