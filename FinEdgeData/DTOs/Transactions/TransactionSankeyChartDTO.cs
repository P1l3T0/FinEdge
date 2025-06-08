namespace FinEdgeData.DTOs
{
    public class TransactionSankeyChartDTO
    {
        public ICollection<SankeyChartNodeDTO> Nodes { get; set; } = new List<SankeyChartNodeDTO>();
        public ICollection<SankeyChartLinkDTO> Links { get; set; } = new List<SankeyChartLinkDTO>();
    }

    public class SankeyChartNodeDTO
    {
        public string Id { get; set; } = string.Empty;
        public SankeyChartLabelDTO Label { get; set; } = new SankeyChartLabelDTO();
    }

    public class SankeyChartLabelDTO
    {
        public string Text { get; set; } = string.Empty;
    }

    public class SankeyChartLinkDTO
    {
        public string SourceId { get; set; } = string.Empty;
        public string TargetId { get; set; } = string.Empty;
        public decimal Value { get; set; }
    }
}