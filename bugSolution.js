// pages/index.js (Server Component)
export default function Home({nestedData}) {
  if (!nestedData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Home</h1>
      <NestedComponent data={nestedData} />
    </div>
  );
}

export async function getServerSideProps() {
  const nestedData = await fetchNestedData();
  return { props: { nestedData } };
}

async function fetchNestedData() {
  const data = await fetch('/api/data');
  return data.json();
}

// pages/api/data.js
export default async function handler(req, res) {
  // Simulate a slow API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  res.status(200).json({a: {b:{c:1}}});
}

// components/NestedComponent.js (Server Component)
export default function NestedComponent({data}) {
  return (
    <div> 
        <h1>Nested: {data?.a?.b?.c}</h1>
    </div>
  );
}
