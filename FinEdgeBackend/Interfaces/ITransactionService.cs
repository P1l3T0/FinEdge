using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ITransactionService
    {
        Task CreateTransactionAsync(Transaction transaction);
        Task<Transaction> GetTransactionByIdAsync(int id);
        Task<ICollection<Transaction>> GetAllTransactionsAsync();
        Task<ICollection<Transaction>> GetAllTransactionsForCategoryAsync(Category category);
        Task<ICollection<Transaction>> GetAllTransactionsForAccountAsync(Account account);
        Task<ICollection<Transaction>> GetAllExpenditureTransactionsAsync(Category category);
        Task<ICollection<Transaction>> GetAllIncomeTransactionsAsync(Category category);
        Task UpdateTranssactionAsync(TransactionDTO transactioDto, Transaction transaction);
        Task DeleteTransactionAsync(Transaction transaction);
        bool Validate(TransactionDTO transactionDto);
    }
}
