# Common Library

Biblioteka zawierająca wspólne komponenty używane przez mikroserwisy w projekcie. 
**Kompatybilna z Spring Boot 3.x i Java 25.**

## Komponenty JWT

### JwtAuthenticationFilter
- Filtr Spring Security do uwierzytelniania JWT
- Automatycznie konfigurowany dla wszystkich serwisów przez Spring Boot Auto-Configuration
- Sprawdza nagłówek Authorization z tokenem Bearer

### JwtService  
- Serwis do walidacji i parsowania tokenów JWT
- Metody:
  - `isTokenInvalid(String token)` - sprawdza czy token jest ważny
  - `getClaims(String token)` - pobiera claims z tokena
  - `getUsernameFromToken(String token)` - pobiera username
  - `getEmailFromToken(String token)` - pobiera email  
  - `getRoleFromToken(String token)` - pobiera rolę

### UserPrincipal
- Implementacja UserDetails dla Spring Security
- Zawiera: ID użytkownika, email, uprawnienia

### JwtUserClaims
- DTO dla claims JWT tokena
- Pola: userId, email, role

## Auto-konfiguracja Spring Boot 3.x

Biblioteka używa nowego mechanizmu auto-konfiguracji wprowadzonego w Spring Boot 3.x:

- **Plik konfiguracyjny**: `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`
- **Klasa auto-konfiguracji**: `CommonJwtAutoConfiguration` z adnotacją `@AutoConfiguration`
- **Wymaga jawnego włączenia**: Ustaw `common.jwt.enabled=true` w konfiguracji

## Konfiguracja

### Wymagania
- **Java 25** lub nowsza
- **Spring Boot 3.5.x** lub nowsza  
- **Spring Security 6.x**

### Dodanie zależności
```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>common-library</artifactId>
    <version>1.0.0</version>
</dependency>
```

### Konfiguracja w application.yml
```yaml
jwt:
  secret: ${JWT_SECRET:mySecretKey}
  accessTokenExpirationMs: 86400000 # 24 hours
  refreshTokenExpirationMs: 604800000 # 7 days

# WYMAGANE: Włącz auto-konfigurację JWT
common:
  jwt:
    enabled: true
```

### Konfiguracja SecurityConfig
```java
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterAfter(jwtAuthenticationFilter, LogoutFilter.class);
        return http.build();
    }
}
```

## Rozszerzanie JwtService

Jeśli potrzebujesz dodatkowej funkcjonalności JWT (np. generowanie tokenów), rozszerz JwtService:

```java
@Service  
public class ExtendedJwtService extends com.example.common.security.JwtService {
    
    public String generateToken(JwtUserClaims claims) {
        // implementacja generowania tokena
        // możesz użyć protected metody getSigningKey()
    }
}
```

## Zalety nowego podejścia

✅ **Spring Boot 3.x Compliance** - Używa najnowszego standardu auto-konfiguracji  
✅ **Java 25 Support** - Najnowsza wersja Java z nowymi funkcjonalnościami  
✅ **Zero Configuration** - Wystarczy dodać zależność  
✅ **Type Safety** - Pełne wsparcie typów w Spring Boot 3.x  
✅ **Performance** - Lepsza wydajność auto-konfiguracji w Spring Boot 3.x  

## Migracja ze starszych wersji

Jeśli migrujesz z wcześniejszych wersji:
1. Zaktualizuj do Java 25+ 
2. Zaktualizuj Spring Boot do 3.5.x+
3. Common-library automatycznie użyje nowego mechanizmu auto-konfiguracji

