import PostList from '@/components/PostList';
import Image from 'next/image';
// export const revalidate = 0;

export default function Home() {
  const postArray = [
    {
      post_id: 1,
      user_id: 5,
      filename: 'https://place-hold.it/1200x800.jpg&text=Pic1&fontsize=120',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb2&fontsize=20',
      filesize: 170469,
      media_type: 'image/jpeg',
      company_name: 'UMH Finland',
      title: '',
      content:
        'Liian paljon kuljetuspaikkaa päivässä. Tuntuu että olen kilpailussa.',
      created_at: '2024-01-07T12:49:34.000Z',
    },
    {
      post_id: 2,
      user_id: 2,
      filename: 'https://place-hold.it/1200x800.jpg&text=Pic1&fontsize=120',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb2&fontsize=20',
      filesize: 170469,
      media_type: 'image/jpeg',
      company_name: 'Musiikkitalo',
      title: 'Työolot ovat heikot',
      content: 'Toimiston äijät eivät välitä meistä',
      created_at: '2024-01-07T13:49:34.000Z',
    },
    {
      post_id: 3,
      user_id: 1,
      filename: 'https://place-hold.it/1200x800.jpg&text=Pic1&fontsize=120',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb2&fontsize=20',
      filesize: 170469,
      media_type: 'image/jpeg',
      company_name: 'K-Kauppa Postitalo',
      title: 'K-kaupan asiakkaat ärsyttää mua',
      content: 'Kaikki vaan huutaa',
      created_at: '2024-01-07T21:49:34.000Z',
    },
    {
      post_id: 4,
      user_id: 5,
      filename: 'https://place-hold.it/1200x800.jpg&text=Pic1&fontsize=120',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb2&fontsize=20',
      filesize: 170469,
      media_type: 'image/jpeg',
      company_name: 'UMH Finland',
      title: '',
      content:
        'Liian paljon kuljetuspaikkaa päivässä. Tuntuu että olen kilpailussa.',
      created_at: '2024-01-07T12:49:34.000Z',
    },
    {
      post_id: 5,
      user_id: 2,
      filename: 'https://place-hold.it/1200x800.jpg&text=Pic1&fontsize=120',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb2&fontsize=20',
      filesize: 170469,
      media_type: 'image/jpeg',
      company_name: 'Musiikkitalo',
      title: 'Työolot ovat heikot',
      content: 'Toimiston äijät eivät välitä meistä',
      created_at: '2024-01-07T13:49:34.000Z',
    },
    {
      post_id: 6,
      user_id: 1,
      filename: 'https://place-hold.it/1200x800.jpg&text=Pic1&fontsize=120',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb2&fontsize=20',
      filesize: 170469,
      media_type: 'image/jpeg',
      company_name: 'K-Kauppa Postitalo',
      title: 'K-kaupan asiakkaat ärsyttää mua',
      content: 'Kaikki vaan huutaa',
      created_at: '2024-01-07T21:49:34.000Z',
    },
  ];
  return (
    <>
      <section className=' flex flex-col min-h-screen relative shadow w-full xs:max-w-md md:max-w-[680px] '>
        <h1 className="text-2xl font-semibold text-left bg-white p-4 border rounded-lg border-slate-300 mb-1">Julkaisut</h1>
        <PostList />
      </section>
    </>
  );
}
