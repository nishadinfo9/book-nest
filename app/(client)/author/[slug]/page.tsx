"use client"
import Container from '@/components/common/Container';
import { getAuthorBooks, getAuthorBySlug } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation'
import { AuthorHeader } from './_components/author-header';
import { AuthorBooks } from './_components/author-books';


const Page = () => {

  const { slug } = useParams();

    const { data: author, isLoading: authorLoading } = useQuery({
    queryKey: ["single-author", slug],
    queryFn: () => getAuthorBySlug(slug as string),
  });

  
    const { data: authorBooks, isLoading: authorBookLoading } = useQuery({
      queryKey: ["author-books"],
      queryFn: () => getAuthorBooks(slug as string),
    });

  return (
    <Container>
         <section className="mt-8 ">
           <div className='mb-6 flex items-center justify-between'>
             <h2 className='text-2xl font-semibold'>Author</h2>
   
           </div>
   <AuthorHeader author={author} />

      <AuthorBooks books={authorBooks} />
   
         </section>
  
      
    </Container>
  )
}

export default Page