"use client"
import Container from '@/components/common/Container';
import { getAuthorBooks, getAuthorById,  } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation'
import { AuthorHeader } from '../_components/author-header';
import { AuthorBooks } from '../_components/author-books';


const Page = () => {

  const { id } = useParams();

    const { data: author, isLoading: authorLoading } = useQuery({
    queryKey: ["single-author", id],
    queryFn: () => getAuthorById(id as string),
  });

  
    const { data: authorBooks, isLoading: authorBookLoading } = useQuery({
      queryKey: ["author-books"],
      queryFn: () => getAuthorBooks(id as string),
    });

    if(authorBookLoading || authorLoading){
      return <div>Loading...</div>
    }

    console.log('author', author)
    console.log('authorBooks', authorBooks)

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