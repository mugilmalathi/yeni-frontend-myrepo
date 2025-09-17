import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Settings</h2>

      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-8">
          {/* Section header */}
          <div className="border-b pb-6">
            <h3 className="text-sm font-semibold text-gray-800">Basic Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              This is login information that you can update anytime.
            </p>
          </div>

          {/* Update password row */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[280px,1fr]">
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Update Password</h4>
              <p className="mt-2 text-sm text-gray-500">
                Manage your password to make sure it is safe
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-sm text-gray-700">Old Password</Label>
                <Input type="password" placeholder="Enter your old password" className="mt-1" />
                <p className="mt-1 text-xs text-gray-400">Minimum 8 characters</p>
              </div>

              <div>
                <Label className="text-sm text-gray-700">New Password</Label>
                <Input type="password" placeholder="Enter your new password" className="mt-1" />
                <p className="mt-1 text-xs text-gray-400">Minimum 8 characters</p>
              </div>

              <Button className="w-fit rounded-full bg-blue-600 px-6 hover:bg-blue-700">
                Change Password
              </Button>
            </div>
          </div>

          <div className="mt-10 border-t" />
        </CardContent>
      </Card>
    </div>
  );
}
