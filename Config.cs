using System;

namespace Wrapper
{
    public class Config
    {
        public string GoalsBackenUrl { get; set; }
        public FirebaseConfig Firebase { get; set; }
    }

    public class FirebaseConfig
    {
        public string ApiKey { get; set; }
        public string AuthDomain { get; set; }
        public string DatabaseURL { get; set; }
        public string ProjectId { get; set; }
        public string StorageBucket { get; set; }
        public string MessagingSenderId { get; set; }
    }
}
