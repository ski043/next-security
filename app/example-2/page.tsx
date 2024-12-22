import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSecret } from "./loader_server";

const Example2 = () => {
  return (
    <div className="">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Example 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            This is an example of how you are probably leaking your secrets to
            the client.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Example2;
