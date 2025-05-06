namespace ResturantApp.Module.Entitys
{
    public class BaseEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public bool IsActive { get; set; }

        public bool IsDelete { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdateDate { get; set; }
    }
}
