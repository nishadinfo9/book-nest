import Link from "next/link";
import { navigation } from "./navigation";

export default function DesktopNav({status}:{status: string}) {
  return (
    <nav className="hidden items-center gap-5 lg:flex">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {item.title}
        </Link>
      ))}
      {
        status ==='authenticated' && (
          <Link href={'/admin/dashboard'} >
              Dashboard
            </Link>
        )
      }
      
    </nav>
  );
}