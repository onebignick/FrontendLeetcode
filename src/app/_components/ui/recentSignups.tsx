
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRepository } from "@/lib/repository/user/UserRepository";

export default async function RecentSignups() {
    const userRepository = new UserRepository();
    const users = await userRepository.getRecentByCreatedDate(5);

    return(
        <Card>
            <CardHeader>
                <CardTitle>Recent Signups</CardTitle>
                <CardDescription>From the past week</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-8">
                {
                    users.map(function(element: any, idx: number) {
                        return(
                            <div key={idx}>
                                <CardTitle>{element.firstName} {element.lastName}</CardTitle>
                                <CardDescription>{element.createdAt.toLocaleString()}</CardDescription>
                            </div>
                        )
                    })
                }
                </div>
            </CardContent>
        </Card>
    )
}