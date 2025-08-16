namespace QuickJoiner.Server.Service
{
    public interface IJoinerService
    {
        string Combine(IFormFile file1, string header1, IFormFile file2, string header2);
    }
    public class JoinerService : IJoinerService
    {
        public string Combine(IFormFile file1, string header1, IFormFile file2, string header2)
        {


            var results = string.Empty;

            return results;
        }
    }
}
