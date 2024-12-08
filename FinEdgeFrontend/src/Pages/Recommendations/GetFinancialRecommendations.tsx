import useGetFinancialRecommendations from "../../Hooks/useGetFinancialRecommendations";

const GetFinancialRecommendations = () => {
  const { data, isLoading, isError, error } = useGetFinancialRecommendations();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      {data?.map((recommendation) => (
        <div key={recommendation.id}>
          <p>{recommendation.recommendation}</p>
          Date created: {new Date(recommendation.dateCreated).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      ))}
    </>
  )
}

export default GetFinancialRecommendations;