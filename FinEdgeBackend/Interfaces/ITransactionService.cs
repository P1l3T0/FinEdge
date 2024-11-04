using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ITransactionService
    {
        Task CreateTransactionAsync(Transaction transaction);
        Task<Transaction> GetTransactionByIdAsync(int transactionID);
        Task<ICollection<Transaction>> GetAllTransactionsAsync();
        Task<ICollection<Transaction>> GetAllExpenditureTransactionsAsync();
        Task<ICollection<Transaction>> GetAllIncomeTransactionsAsync();
        Task<ICollection<Transaction>> GetAllTransactionsForCategoryAsync(Category category);
        Task<ICollection<Transaction>> GetAllTransactionsForAccountAsync(Account account);
        Task UpdateTranssactionAsync(TransactionDTO transactioDto, Transaction transaction, Category category, Account account);
        Task DeleteTransactionAsync(Transaction transaction);
        bool Validate(TransactionDTO transactionDto);
    }
}
