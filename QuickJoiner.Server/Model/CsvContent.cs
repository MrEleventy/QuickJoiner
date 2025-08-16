namespace QuickJoiner.Server.Model
{
    public class CsvContent
    {
        public string[] headers { get; set; } = Array.Empty<string>();
        
        public List<Dictionary<string,string>> row { get; set; } = new List<Dictionary<string,string>>();

        public void ProcessFile(IFormFile file)
        {
            string? headerLine = null;
            if ((file.ContentType?.StartsWith("text") ?? false) || file.FileName.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
            {
                using var reader = new StreamReader(file.OpenReadStream());
                headerLine = reader.ReadLine();
                
                if(headerLine != null)
                    headers = headerLine.Split(',');

                while (!reader.EndOfStream)
                {
                    var row = reader.ReadLine();
                    if(row != null)
                    {
                        var record = row.Split(',');

                        Dictionary<string,string> dict = new Dictionary<string,string>();
                        for (var i = 0; i < record.Length; i++)
                        {
                            var key = headers[i];
                            var value = record[i];

                            dict.Add(key, value);
                        }
                    }                        
                }
            }
        }
    }
}
