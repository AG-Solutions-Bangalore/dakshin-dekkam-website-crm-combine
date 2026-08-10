



import PageMeta from '@/website/components/common/PageMeta';
import HeroSub from '@/website/components/HeroSub';
import LoanForm from './LoanForm';


const LoanIndex = () => {
     const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/loan", text: "Loan" },
  ];
  return (
 <>
      <PageMeta title="Loan | Dakshin Ekkam" />
      <HeroSub
        title="Loan"
        breadcrumbLinks={breadcrumbLinks}
      />
      <LoanForm />
    </>
  )
}

export default LoanIndex


