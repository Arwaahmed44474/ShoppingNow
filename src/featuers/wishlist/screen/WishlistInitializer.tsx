'use client'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wishActions } from '../slice/wishSlice';

export function WishlistInitializer({ count }: { count: number }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wishActions.setWishCount(count));
  }, [count, dispatch]);

  return null; 
}