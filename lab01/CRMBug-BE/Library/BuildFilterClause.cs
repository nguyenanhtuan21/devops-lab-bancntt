using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;
using static Library.Enumeration.Enumeration;

namespace Library
{
  public static class BuildFilterClause
  {
    public static string BuildFilter(ParamGrid param)
    {
      StringBuilder oWhere = new StringBuilder("( (1=1)");
      var filters = param.Filters.Where(x => x.IsFormula == false)?.ToList();
      var formulas = param.Filters.Where(x => x.IsFormula == true)?.ToList();
      if (filters != null && filters.Any())
      {
        foreach(var fieldFilter in filters)
        {
          if (fieldFilter.Value != null && !string.IsNullOrEmpty(fieldFilter.Value.ToString()) && !string.IsNullOrEmpty(fieldFilter.FieldName))
          {
            string tmpQuery = string.Empty;
            switch(fieldFilter.Addition)
            {
              case Addition.And:
                tmpQuery += " AND";
                break;
              case Addition.Or:
                tmpQuery += " OR";
                break;
            }
            switch(fieldFilter.Operator)
            {
              case Operator.Equal:
                tmpQuery = $"{tmpQuery} T.{fieldFilter.FieldName} = '{fieldFilter.Value.ToString()}' ";
                break;
              case Operator.Like:
                tmpQuery = $"{tmpQuery} T.{fieldFilter.FieldName} LIKE N'%{fieldFilter.Value.ToString()}%' ";
                break;
              case Operator.Between:
                //var fromDate = Utils.Deserialize<DateTime>(fieldFilter.Value1);
                //var toDate = Utils.Deserialize<DateTime>(fieldFilter.Value2);
                var fromDate = Convert.ToDateTime(fieldFilter.Value1.ToString());
                var toDate = Convert.ToDateTime(fieldFilter.Value2.ToString());
                tmpQuery = $"{tmpQuery} T.{fieldFilter.FieldName} BETWEEN '{fromDate.ToString("yyyy-MM-dd HH:mm:ss")}' AND '{toDate.ToString("yyyy-MM-dd HH:mm:ss")}'";
                break;
              case Operator.In:
                tmpQuery = $"{tmpQuery} T.{fieldFilter.FieldName} IN ({fieldFilter.Value.ToString()}) ";
                break;
            }
            //if(fieldFilter.IsAllowEmpty)
            //{
            //  tmpQuery = $"{tmpQuery} OR T.{fieldFilter.FieldName} IS NULL";
            //}
            oWhere.Append(tmpQuery);
          }
        }
      }
      if(!string.IsNullOrEmpty(param.Formula) && formulas != null && formulas.Any())
      {
        List<string> formulaQuery = new List<string>();
        foreach (var fieldFilter in formulas)
        {
          string tmpQuery = string.Empty;
          switch (fieldFilter.Operator)
          {
            case Operator.Equal:
              tmpQuery = $"T.{fieldFilter.FieldName} = '{fieldFilter.Value}' ";
              break;
            case Operator.Like:
              tmpQuery = $"T.{fieldFilter.FieldName} LIKE N'%{fieldFilter.Value}%' ";
              break;
            case Operator.In:
              tmpQuery = $"{tmpQuery} T.{fieldFilter.FieldName} IN ({fieldFilter.Value.ToString()}) ";
              break;
          }
          formulaQuery.Add(tmpQuery);
        }
        oWhere.Append($" AND {string.Format(param.Formula, formulaQuery.ToArray())}");
      }
      oWhere.Append($")");
      return oWhere.ToString();
    }
  }
}
