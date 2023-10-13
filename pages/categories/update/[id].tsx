import {useRouter} from 'next/router';
import CategoryUpdateForm from '../../../components/CategoryUpdateForm';
import Layout from "../../../components/Layout";

const UpdateCategoryPage = () => {
    const router = useRouter();
    const {id} = router.query;

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <div>
                <h1>Edit Category</h1>
                <CategoryUpdateForm categoryId={id as string}/>
            </div>
        </Layout>
    );
};

export default UpdateCategoryPage;