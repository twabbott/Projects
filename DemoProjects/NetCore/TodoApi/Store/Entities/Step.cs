using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Store.Entities
{
    public class Step
    {
        [Key] // Not required (EFC will automatically select "Id" to be the PK)
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required] // (validation attributes) This value is required 
        [MaxLength(200)] // (validation attributes) This value has a max-length of 200
        public string Description { get; set; }

        // By convention, putting a reference to a Todo object signals to EFC that
        // this property will link back via a FK relationship.  
        [ForeignKey("TodoId")] // Not required, but this explicitly tells EFC which prop to use for the FK.
        public Todo Todo { get; set; }

        // The convention-based approach also requires a prop like this to be used
        // to set up th FK for the parent TODO item.
        public long TodoId { get; set; }
    }
}