using System;
namespace net_core_be
{
	public class ResponseResult
	{
        public int statusCode { get; set; }
        public string Message { get; set; }
        public IEnumerable<dynamic>? Data { get; set; }
    }
}

