using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Library
{
  public static class Utils
  {
    public static string Base64Encode(string plainText)
    {
      var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
      return System.Convert.ToBase64String(plainTextBytes);
    }

    public static string Base64Decode(string base64EncodedData)
    {
      var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
      return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
    }

    public static T Deserialize<T>(string value)
    {
      return JsonConvert.DeserializeObject<T>(value, GetJsonSerializerSettings());
    }

    public static string Serialize(object value)
    {
      return JsonConvert.SerializeObject(value, GetJsonSerializerSettings());
    }

    private static JsonSerializerSettings GetJsonSerializerSettings(DateTimeZoneHandling timeZoneHandling = DateTimeZoneHandling.Local)
    {
      return new JsonSerializerSettings
      {
         DateFormatHandling = DateFormatHandling.IsoDateFormat,
         DateTimeZoneHandling = timeZoneHandling,
         NullValueHandling = NullValueHandling.Ignore
      };
    }
  }
}
