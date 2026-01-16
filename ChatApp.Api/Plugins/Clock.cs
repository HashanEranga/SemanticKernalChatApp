using Microsoft.SemanticKernel;
using System.ComponentModel;

namespace ChatApp.Api.Plugins;

public class Clock
{
    [KernelFunction("get_current_date_time")]
    [Description("Get my current date and time with time zone")]
    [return: Description("date time formatted as dddd, MMMM dd, yyyy HH:mm:ss zzz")]
    public string GetCurrentDateTime()
    {
        return DateTime.Now.ToString("dddd, MMMM dd, yyyy HH:mm:ss zzz");
    }

}