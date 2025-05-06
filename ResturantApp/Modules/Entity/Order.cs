using System.ComponentModel.DataAnnotations.Schema;

namespace ResturantApp.Module.Entitys
{
    public class Order : BaseEntity
    {
        [Column(TypeName = "nvarchar(50)")]
        public decimal OrderNo { get; set; }

        public Guid CustomerID { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string PayMethod { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal GTotal { get; set; }

        //[ForeignKey("CustomerID")]
        public ICollection<Customer> Customers { get; set; } = new List<Customer>();

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
