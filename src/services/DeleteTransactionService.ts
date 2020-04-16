import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface RequestDTO {
  transactionId: string;
}

class DeleteTransactionService {
  public async execute({ transactionId }: RequestDTO): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    const transaction = await transactionsRepository.findOne(transactionId);

    if (!transaction) {
      throw new AppError('Transaction not found', 400);
    }

    await transactionsRepository.delete(transactionId);
  }
}

export default DeleteTransactionService;
