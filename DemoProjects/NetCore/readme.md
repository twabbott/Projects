# NetCore

This is a demonstration project.  Its purpose is to be a how-to, or a starter project that uses:
* .NET Core 2
* ASP WebAPI
* Entity Framework Core

# Building this project

This project uses .NET Core 2.2, which at the time of this writing was in Preview 2.  It will be upgraded when 2.2 becomes widely availble.

## Errors

**Can't find project.assets.json**
I had the following error at one point.

> Assets file 'C:\Users\tabbott\OneDrive\Development\NetCore\TodoApi\obj\project.assets.json' not found. Run a NuGet package restore to generate this file.

I got this problem because I was keeping my project on OneDrive (Don't use OneDrive for coding projects, use BitBucket or GitHub!!).  This gave me fits for quite a long time, and it showed up on all my computers.  Finally I decided to move this project to Git, and in so doing I found that there was a reference to this file in the obj folder.  After deleting the obj folder, everything built just fine.