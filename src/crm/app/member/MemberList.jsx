import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";
import MemberTable from "@/crm/components/MemberTable/MemberTable";
import { useFetchMemberData } from "@/hooks/useApi";
import { useNavigate } from "react-router-dom";
import Page from "../page/page";
const MemberList = () => {
  const {
    data: memberdata,
    isLoading,
    isError,
    refetch,
  } = useFetchMemberData();
  const navigate = useNavigate();

  if (isLoading) return <LoaderComponent />;
  if (isError)
    return (
      <ErrorComponent message="Error Fetching Member Data" refetch={refetch} />
    );

  const allMembers = memberdata?.data || [];

  return (
    <Page>
      <div className="w-full space-y-8">
        <MemberTable
          title="Member List"
          data={allMembers}
          refetch={refetch}
          navigate={navigate}
        />
      </div>
    </Page>
  );
};
export default MemberList;
