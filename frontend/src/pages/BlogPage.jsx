import { Suspense, lazy } from "react";
import { useMatch, useParams, useNavigate, useLocation } from "react-router-dom";
import GlobalLoader from "../components/ui/Loader/GlobalLoader";
import WhiteSpace from "../components/layout/WhiteSpace/WhiteSpace";
import Block from "../components/layout/Block/Block";
import { ArrowLeft } from "lucide-react";

const Article = lazy(() => import("../sections/Blog/Article"));
const CaseStudy = lazy(() => import("../sections/Blog/CaseStudy"));

const BlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const articleMatch = useMatch("/resources/article/:slug");
  const caseStudyMatch = useMatch("/resources/case-study/:slug");
  const isPreview = articleMatch && slug === "_preview";

  const from = new URLSearchParams(location.search).get("from");
  const type = new URLSearchParams(location.search).get("type");

  const backOptions = {
    home: { label: "Back to Home", path: "/" },
    resources: { label: "Back to Resources", path: "/resources" },
    about: { label: "Back to About", path: "/about" },
  };
  const back = backOptions[from] || backOptions.resources;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex justify-center">
        <Block xpad="none">
          <div className="px-6 bg-white/100 backdrop-blur-xl flex items-center w-full h-16">
            <button
              onClick={handleBack}
              className="group flex items-center gap-2 font-mono text-[14px] uppercase text-[#131212] hover:text-[#FF5A36] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {back.label}
            </button>
          </div>
        </Block>
      </header>

      <main style={{ overflow: "hidden" }}>
        <Suspense fallback={<GlobalLoader />}>
          {isPreview ? (
            <></>
          ) : caseStudyMatch ? (
            <CaseStudy slug={slug} type={type} />
          ) : (
            <Article slug={slug} />
          )}
        </Suspense>
        <WhiteSpace height="10vh" />
      </main>
    </>
  );
};

export default BlogPage;