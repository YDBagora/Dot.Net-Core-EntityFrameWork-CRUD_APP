using System.ComponentModel.DataAnnotations.Schema;

namespace ResturantApp.Module.Entitys
{
    public class Customer : BaseEntity
    {
        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; } = string.Empty;

        public ICollection<Order> Order { get; set; } = new List<Order>();
    }
}