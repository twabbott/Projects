// This file is used by Code Analysis to maintain SuppressMessage
// attributes that are applied to this project.
// Project-level suppressions either have no target or are given
// a specific target and scoped to a namespace, type, member, etc.

// For more info, refer to:
//     https://docs.microsoft.com/en-us/visualstudio/code-quality/in-source-suppression-overview?view=vs-2017#suppressmessage-attribute

[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1305:Specify IFormatProvider", Justification = "Nope")]

[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.SpacingRules",          "SA1009:Closing parenthesis must be spaced correctly", Justification = "Nope")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.SpacingRules",          "SA1025:Code must not contain multiple whitespace in a row", Justification = "No")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.ReadabilityRules",      "SA1101:Prefix local calls with this", Justification = "No, we're not going to do this")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.ReadabilityRules",      "SA1111:Closing parenthesis must be on line of last parameter", Justification = "Nope")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.OrderingRules",         "SA1200:Using directives must be placed correctly", Justification = "This rule is flat-out wrong.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.OrderingRules",         "SA1202:Elements must be ordered by access", Justification = "I disagree")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.OrderingRules",         "SA1204:Static elements must appear before instance elements", Justification = "Nope")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.NamingRules",           "SA1309:Field names must not begin with underscore", Justification = "Sorry, we ARE doing this.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.LayoutRules",           "SA1512:Single-line comments must not be followed by blank line", Justification = "Nope")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.DocumentationRules",    "SA1611:Element parameters must be documented", Justification = "Nope")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.DocumentationRules",    "SA1633:File must have header", Justification = "Code is for internal use only.")]
[assembly: System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.DocumentationRules",    "SA1652:Enable XML documentation output", Justification = "This is just a noisy rule.")]
