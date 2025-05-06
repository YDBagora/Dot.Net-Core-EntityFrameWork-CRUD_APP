namespace ResturantApp.Modules
{
    public class OrderDto
    {
   
        public Guid Id { get; set; }
        public decimal OrderNo { get; set; } 
        public Guid CustomerID { get; set; }
        public string PayMethod { get; set; } = string.Empty;
        public decimal GTotal { get; set; }
        public List<CustomerDto> Customers { get; set; } = new List<CustomerDto>();
        public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
    }

        public class OrderItemDto
        {
            public Guid Id { get; set; }
            public Guid OrderID { get; set; }
            public Guid ItemID { get; set; }
            public string Name { get; set; } = string.Empty;
            public int Quantity { get; set; }
            public decimal Price { get; set; }
            public decimal GTotal { get; set; }
        }

    public class CustomerDto
    {
        public string Name { get; set; } = string.Empty;
    }

}