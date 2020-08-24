using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace TG.Blazor.IndexedDB.IndexedDB
{
    public class IDBKeyRange
    {
        public object lower { get; set; }
        public bool lowerOpen { get; set; }

        public object upper { get; set; }
        public bool upperOpen { get; set; }

        public override string ToString()
        {
            return $"{(lower == null ? "" : (lowerOpen ? $">{lower}" : $">={lower}"))} {(upper == null ? "" : (upperOpen ? $">{upper}" : $">={upper}"))}";
        }

    }
}
