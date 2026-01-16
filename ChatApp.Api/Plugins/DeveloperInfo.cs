using System.ComponentModel;
using Microsoft.SemanticKernel;

namespace ChatApp.Api.Plugins;

public class DeveloperInfo
{
    [KernelFunction("get_the_developer_info")]
    [Description("call this when developer information is needed including name, address, location or birthdate")]
    [return: Description("returns developer name, designation formated as JSON")]
    public Info GetInfo() => new Info();
}

public class Info
{
    public string Name { get; set; } = "Hashan Eranga";
    public string Designation { get; set; } = "Senior Software Engineer";


}