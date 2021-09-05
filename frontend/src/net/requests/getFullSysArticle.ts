import { useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { ENDPOINTS } from '../apiEndpoints';
import { prepareURL } from '../apiUtil';
import { request } from '../request';
import { useAuth } from '../../components/general/AuthWrapper/AuthWrapper';

type GetFullSysArticleReqProps = {
    id: number;
};

type GetFullSysArticleResData = {
    article: Article;
};

export const getFullSysArticle: API.Request<
    GetFullSysArticleReqProps,
    GetFullSysArticleResData
> = async (data, token) => {
    const url = prepareURL(
        ENDPOINTS.article.system.single,
        [],
        [],
        ['article_id'],
        [data.id]
    );
    return request(url, data, 'GET', {
        'content-type': 'application/json',
        authorization: token,
    });
};

export const useGetFullSysArticle = (
    query: GetFullSysArticleReqProps,
    fn?: {
        onSuccess?: API.OnSuccessFn<GetFullSysArticleResData>;
        onError?: API.OnFailureFn;
    }
) => {
    const { token } = useAuth();
    return useQuery<AxiosResponse<GetFullSysArticleResData>, AxiosError>(
        ['getFullSysArticle', query.id],
        () => {
            return getFullSysArticle(query, token);
        },
        {
            enabled: false,
            onSuccess: fn?.onSuccess,
            onError: fn?.onError,
        }
    );
};
