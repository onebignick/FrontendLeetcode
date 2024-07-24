import ApproveQuestions from "./ui/ApproveQuestions";
import RecentSignups from "./ui/recentSignups";
import { VisitorChart } from "./ui/visitorChart";

export default function AdminPage() {

    return(
        <main className="px-5 lg:px-10 xl:px-15 py-5">
            <div className="flex flex-row space-x-24 w-full">
                <div className="bases-2/3"><VisitorChart/></div>
                <div className="basis-1/3 flex flex-col space-y-16">
                    <ApproveQuestions/>
                    <RecentSignups/>
                </div>
            </div>
        </main>
    )
}