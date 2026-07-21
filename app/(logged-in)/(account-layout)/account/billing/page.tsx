import {
  Layout,
} from "@/features/page/layout";
import { Offers } from "@/features/landing/offers";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getUserActiveSubscription } from "@/lib/user/get-user-subscription";
import { UserBilling } from "./user-billing";

export const generateMetadata = combineWithParentMetadata({
  title: "Billing",
  description: "Manage your organization billing.",
});

export default async function OrgBillingPage() {
  const subscription = await getUserActiveSubscription();

  if (!subscription) {
    return (
      <>
        <Layout size="lg" className="py-0">
          <Offers />
        </Layout>
      </>
    );
  }

  return <UserBilling subscription={subscription} />;
}