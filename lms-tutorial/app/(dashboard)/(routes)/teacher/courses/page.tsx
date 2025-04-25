import {Button} from "@/components/ui/button";
import {Link} from "lucide-react";
const CoursesPage =() => {
    return(
        <div className ="p-6">
            <Link href="/teacher/create">
            <Button>
               new course 
            </Button>
            </Link>
        </div>
    );
}
export default CoursesPage;
